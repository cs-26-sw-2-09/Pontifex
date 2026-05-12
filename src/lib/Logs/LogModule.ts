import * as fs from "fs";
import type { UserType, Role } from "$lib/types";

export class LogModule {
	private readonly logFilePath: string =
		"src/lib/Logs/Files/Log-" + new Date().toISOString().split("T")[0] + ".txt";

	// Write User Login to log file
	public async writeLoginLog(userId: number, userName: string, userRole: Role): Promise<void> {
		const logMessage = `${new Date().toISOString().split("T")[1]} - User Login - User: ${userName} - Role: ${userRole}\n`;
		await appendLogMessage(logMessage, this.logFilePath);
	}

	// Write acces log message to log file
	public async writeAccessLog(
		message: string,
		currentUser: UserType,
		requestAction: string,
		requestResource: string
	): Promise<void> {
		const logMessage = `${new Date().toISOString().split("T")[1]} - ${message} - User: ${currentUser.Name} - - Role: ${currentUser.Role} - Action: ${requestAction} - Resource: ${requestResource}\n`;
		await appendLogMessage(logMessage, this.logFilePath);
	}
	// Write error log message to log file
	public async writeErrorLog(message: string, error: Error): Promise<void> {
		const logMessage = `${new Date().toISOString().split("T")[1]} - ${message} - Error: ${error.message}\n`;
		await appendLogMessage(logMessage, this.logFilePath);
	}
}

async function appendLogMessage(logMessage: string, logFilePath: string): Promise<void> {
	fs.appendFile(logFilePath, logMessage, (err) => {
		if (err) {
			console.error("Error writing to log file:", err);
		}
	});
}
