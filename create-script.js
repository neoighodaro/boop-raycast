#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const SCRIPTS_DIR = path.join(__dirname, "src", "scripts");
const SCRIPT_STUB = path.join(__dirname, "stubs", "script.ts.stub");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function toCamelCase(str) {
  return str
    .replace(/[-\s]([a-z])/g, (_, letter) => letter.toUpperCase())
    .replace(/^[A-Z]/, (letter) => letter.toLowerCase());
}

async function createScript() {
  console.log("🛠️  Create New Boop Script\n");

  try {
    const name = await question('Script name (e.g., "Base64 Encode"): ');
    if (!name.trim()) {
      throw new Error("Script name is required");
    }

    const description = await question("Description: ");
    if (!description.trim()) {
      throw new Error("Description is required");
    }

    const author = (await question("Author (default: neoish): ")) || "neoish";
    const icon = (await question("Icon (default: gear): ")) || "gear";

    const fileName = toKebabCase(name) + ".ts";
    const id = toCamelCase(name);

    console.log("\n📋 Summary:");
    console.log(`  Name: ${name}`);
    console.log(`  Description: ${description}`);
    console.log(`  ID: ${id}`);
    console.log(`  File: ${fileName}`);
    console.log(`  Author: ${author}`);
    console.log(`  Icon: ${icon}`);

    const confirm = await question("\nCreate this script? (y/N): ");
    if (confirm.toLowerCase() !== "y") {
      console.log("❌ Cancelled");
      return;
    }

    // Read stub template
    if (!fs.existsSync(SCRIPT_STUB)) {
      throw new Error("Script stub file not found");
    }

    let content = fs.readFileSync(SCRIPT_STUB, "utf-8");

    // Replace placeholders
    content = content
      .replace(/{{name}}/g, name)
      .replace(/{{description}}/g, description)
      .replace(/{{id}}/g, id)
      .replace(/{{author}}/g, author)
      .replace(/{{icon}}/g, icon)
      .replace(/{{code}}/g, "// TODO: Implement your script logic here\n  // state.text = ...");

    // Ensure scripts directory exists
    if (!fs.existsSync(SCRIPTS_DIR)) {
      fs.mkdirSync(SCRIPTS_DIR, { recursive: true });
    }

    const filePath = path.join(SCRIPTS_DIR, fileName);

    if (fs.existsSync(filePath)) {
      throw new Error(`File ${fileName} already exists`);
    }

    fs.writeFileSync(filePath, content);

    console.log(`\n✅ Created ${fileName}`);
    console.log("📝 Don't forget to implement your script logic!");
    console.log("🔄 Run `npm run sync-actions` to update the actions");
  } catch (error) {
    console.error("\n❌ Error:", error.message);
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  createScript();
}

module.exports = { createScript };
