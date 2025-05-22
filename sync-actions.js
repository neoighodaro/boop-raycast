#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const SCRIPTS_DIR = path.join(__dirname, "src", "scripts");
const ACTIONS_FILE = path.join(__dirname, "src", "components", "actions.tsx");
const INDEX_FILE = path.join(__dirname, "src", "scripts", "index.ts");
const TYPES_FILE = path.join(__dirname, "src", "types", "index.d.ts");
const ACTIONS_STUB = path.join(__dirname, "stubs", "actions.tsx.stub");

/**
 * Parse JSDoc comment block to extract metadata
 */
function parseJSDoc(content) {
  const jsDocRegex = /\/\*\*\s*([\s\S]*?)\s*\*\//;
  const match = content.match(jsDocRegex);

  if (!match) {
    return null;
  }

  const jsDocContent = match[1];
  const lines = jsDocContent.split("\n").map((line) => line.replace(/^\s*\*\s?/, "").trim());

  let title = "";
  let description = "";
  let id = "";
  let author = "";
  let icon = "";
  let bias = null;

  let currentSection = "title";

  for (const line of lines) {
    if (line.startsWith("@id")) {
      id = line.replace("@id", "").trim();
      currentSection = "none";
    } else if (line.startsWith("@author")) {
      author = line.replace("@author", "").trim();
      currentSection = "none";
    } else if (line.startsWith("@icon")) {
      icon = line.replace("@icon", "").trim();
      currentSection = "none";
    } else if (line.startsWith("@bias")) {
      const biasValue = line.replace("@bias", "").trim();
      const parsedBias = parseInt(biasValue, 10);
      if (!isNaN(parsedBias) && parsedBias >= 0 && parsedBias <= 99) {
        bias = parsedBias;
      } else {
        console.warn(`⚠️  Invalid bias value "${biasValue}" - must be a number between 0 and 99`);
      }
      currentSection = "none";
    } else if (line.startsWith("@")) {
      currentSection = "none";
    } else if (line.trim() === "") {
      if (currentSection === "title") {
        currentSection = "description";
      }
    } else {
      if (currentSection === "title") {
        title = line;
      } else if (currentSection === "description") {
        description += (description ? " " : "") + line;
      }
    }
  }

  return { title, description, id, author, icon, bias };
}

/**
 * Validate script format
 */
function validateScript(filePath, content, metadata) {
  const errors = [];

  if (!metadata) {
    errors.push("Missing or invalid JSDoc comment block");
    return errors;
  }

  if (!metadata.title) {
    errors.push("Missing title in JSDoc");
  }

  if (!metadata.description) {
    errors.push("Missing description in JSDoc");
  }

  if (!metadata.id) {
    errors.push("Missing @id in JSDoc");
  } else if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(metadata.id)) {
    errors.push("@id must be camelCase and contain only letters and numbers");
  }

  // Check for default export
  if (!content.includes("export default function")) {
    errors.push("Missing default export function");
  }

  return errors;
}

/**
 * Convert filename to camelCase id if no @id is provided
 */
function filenameToCamelCase(filename) {
  return filename.replace(/\.ts$/, "").replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Sort scripts by bias (higher first) then alphabetically by title
 */
function sortScripts(scripts) {
  return scripts.sort((a, b) => {
    // First sort by bias (higher bias comes first)
    // Scripts without bias are treated as having bias 0
    const biasA = a.bias !== null ? a.bias : 0;
    const biasB = b.bias !== null ? b.bias : 0;

    if (biasA !== biasB) {
      return biasB - biasA; // Higher bias first
    }

    // If bias is the same (or both null), sort alphabetically by title
    return a.title.localeCompare(b.title);
  });
}

/**
 * Process all script files
 */
function processScripts() {
  console.log("🔍 Scanning scripts directory...");

  if (!fs.existsSync(SCRIPTS_DIR)) {
    console.error("❌ Scripts directory not found:", SCRIPTS_DIR);
    process.exit(1);
  }

  const files = fs
    .readdirSync(SCRIPTS_DIR)
    .filter((file) => file.endsWith(".ts") && file !== "index.ts")
    .sort();

  console.log(`📝 Found ${files.length} script file(s)`);

  const scripts = [];
  let hasErrors = false;

  for (const file of files) {
    const filePath = path.join(SCRIPTS_DIR, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const metadata = parseJSDoc(content);

    console.log(`\n📄 Processing ${file}...`);

    const errors = validateScript(filePath, content, metadata);

    if (errors.length > 0) {
      console.error(`❌ Validation errors in ${file}:`);
      for (const error of errors) {
        console.error(`   - ${error}`);
      }
      hasErrors = true;
      continue;
    }

    // Use filename as fallback for id
    const scriptId = metadata.id || filenameToCamelCase(file);
    const moduleName = file.replace(/\.ts$/, "");

    scripts.push({
      id: scriptId,
      title: metadata.title,
      description: metadata.description,
      author: metadata.author,
      icon: metadata.icon,
      bias: metadata.bias,
      moduleName,
      fileName: file,
    });

    const biasInfo = metadata.bias !== null ? ` (bias: ${metadata.bias})` : "";
    console.log(`✅ ${file} -> ${scriptId} (${metadata.title})${biasInfo}`);
  }

  if (hasErrors) {
    console.error("\n❌ Fix validation errors before proceeding");
    process.exit(1);
  }

  // Sort scripts by bias and then alphabetically
  const sortedScripts = sortScripts(scripts);

  console.log("\n📊 Final script order:");
  sortedScripts.forEach((script, index) => {
    const biasInfo = script.bias !== null ? ` (bias: ${script.bias})` : "";
    console.log(`  ${index + 1}. ${script.title}${biasInfo}`);
  });

  return sortedScripts;
}

/**
 * Convert icon string to proper Raycast Icon reference
 */
function formatIcon(iconString) {
  if (!iconString) {
    return "Icon.Gear"; // Default icon
  }

  // If it's already an Icon reference, return as-is
  if (iconString.startsWith("Icon.")) {
    return iconString;
  }

  // Convert kebab-case or snake_case to PascalCase
  const pascalCase = iconString
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");

  return `Icon.${pascalCase}`;
}

/**
 * Generate actions.tsx file
 */
function generateActionsFile(scripts) {
  console.log("\n🔧 Generating actions file...");

  if (!fs.existsSync(ACTIONS_STUB)) {
    console.error("❌ Actions stub file not found:", ACTIONS_STUB);
    process.exit(1);
  }

  const stub = fs.readFileSync(ACTIONS_STUB, "utf-8");

  const actions = scripts
    .map((script) => {
      const iconRef = formatIcon(script.icon);
      return `      <Action.SubmitForm
        title="${script.title}"
        icon={${iconRef}}
        onSubmit={(state) => onSubmit({ ...state, intent: "${script.id}" } as BoopState)}
      />`;
    })
    .join("\n");

  const content = stub.replace("{{actions}}", actions);

  // Ensure directory exists
  const actionsDir = path.dirname(ACTIONS_FILE);
  if (!fs.existsSync(actionsDir)) {
    fs.mkdirSync(actionsDir, { recursive: true });
  }

  fs.writeFileSync(ACTIONS_FILE, content);
  console.log(`✅ Generated ${ACTIONS_FILE}`);
}

/**
 * Generate index.ts file
 */
function generateIndexFile(scripts) {
  console.log("🔧 Generating index file...");

  const exports = scripts
    .map((script) => {
      return `export { default as ${script.id} } from "./${script.moduleName}";`;
    })
    .join("\n");

  fs.writeFileSync(INDEX_FILE, `${exports}\n`);
  console.log(`✅ Generated ${INDEX_FILE}`);
}

/**
 * Update types file
 */
function updateTypesFile(scripts) {
  console.log("🔧 Updating types file...");

  if (!fs.existsSync(TYPES_FILE)) {
    console.log("📝 Creating new types file...");
    // Create the file if it doesn't exist
    const newContent = `interface BoopState {
  text: string;
  intent: BoopIntents;
}

interface ActionsProps {
  handleSubmit: (state: BoopState) => void;
  onStart?: (state: BoopState) => void;
  onFailure?: (state: BoopState) => void;
  onSuccess?: (state: BoopState) => void;
}

type BoopIntents = "${scripts.map((s) => s.id).join('" | "')}";
`;
    fs.writeFileSync(TYPES_FILE, newContent);
  } else {
    let content = fs.readFileSync(TYPES_FILE, "utf-8");

    const intents = scripts.map((script) => `"${script.id}"`).join(" | ");
    const newType = `type BoopIntents = ${intents};`;

    // Replace existing BoopIntents type
    const typeRegex = /type\s+BoopIntents\s*=\s*[^;]+;/;
    if (typeRegex.test(content)) {
      content = content.replace(typeRegex, newType);
    } else {
      // Add the type if it doesn't exist
      content += `\n${newType}\n`;
    }

    fs.writeFileSync(TYPES_FILE, content);
  }

  console.log(`✅ Updated ${TYPES_FILE}`);
}

/**
 * Main function
 */
function main() {
  console.log("🚀 Starting Boop script synchronization...\n");

  try {
    const scripts = processScripts();

    if (scripts.length === 0) {
      console.log("\n⚠️  No valid scripts found");
      return;
    }

    generateActionsFile(scripts);
    generateIndexFile(scripts);
    updateTypesFile(scripts);

    console.log(`\n🎉 Successfully synchronized ${scripts.length} script(s)!`);
    console.log("\nAvailable scripts (in action order):");
    for (const script of scripts) {
      const biasInfo = script.bias !== null ? ` (bias: ${script.bias})` : "";
      console.log(`  • ${script.title} (${script.id})${biasInfo}`);
    }
  } catch (error) {
    console.error("\n❌ Error during synchronization:", error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { main, processScripts, parseJSDoc, sortScripts };
