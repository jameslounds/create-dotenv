import * as core from "@actions/core";

export function readEnv(
    envPrefix: string,
    includedVars: string[]
): Map<string, string> {
    const env = process.env;

    let envFileMap: Map<string, string> = new Map();

    if (includedVars.length === 0) {
        console.log("No files specified, including all files");
        includedVars = Object.keys(env);
    } else {
        console.log("only including vars", includedVars);
    }

    core.info("Reading environmental variable");

    for (const [key, value] of Object.entries(env)) {
        if (key.startsWith(envPrefix) && includedVars.includes(key)) {
            const regex = RegExp(`^${envPrefix}`);

            const envKeyName = key.replace(regex, "");
            const envKeyValue = String(value);
            envFileMap.set(envKeyName, envKeyValue);
        }
    }
    return envFileMap;
}
