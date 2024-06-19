import { spawn } from "node:child_process";

export enum PythonScripts {
  derivePrivateKey = "src/scripts/deriveKeyFromSeed.py",
}

export interface PythonScriptsParams {
  [PythonScripts.derivePrivateKey]: [
    string, // seedHex
  ];
}

const defaultOnSuccess = (data: Buffer) => {
  console.log(`stdout: ${data.toString("hex")}`);
};

const defaultOnError = (data: string) => {
  console.log(`stdout: ${data}`);
};

const defaultOnClose = (code: number) => {
  console.log(`Child process exited with code ${code}`);
};

interface CallPythonScriptParams {
  scriptFile: PythonScripts;
  params: PythonScriptsParams[PythonScripts];
  onSuccess?: (data: Buffer) => void;
  onError?: (data: string) => void;
  onClose?: (code: number) => void;
}

export const callPythonScript = ({
  scriptFile,
  params,
  onSuccess = defaultOnSuccess,
  onError = defaultOnError,
  onClose = defaultOnClose,
}: CallPythonScriptParams) => {
  // Call the Python script with the seed hex argument
  const process = spawn("python3", [scriptFile, ...params]);

  // Handle the output from the Python script
  process.stdout.on("data", onSuccess);
  process.stderr.on("data", onError);
  process.on("close", onClose);
};
