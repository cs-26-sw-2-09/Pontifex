import type { UserType, Role, Actions, Course, Review, Submissions } from "$lib/types";
import path from "path";
import { mkdir, appendFile } from "fs/promises";

class LogModule {
	// Private Readonly Property to store the file path
	private readonly logFilePath: string;

	//constructor to initialize the log file path based on the current date
	constructor() {
		const date = new Date().toISOString().split("T")[0];
		this.logFilePath = path.join(process.cwd(), "Logs", `Log-${date}.txt`);
	}
	// Private method to get the current time, formatted as HH:mm:ss
	private GetTime() {
		return new Date().toLocaleTimeString("da-DK", {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit"
		});
	}

	// Write User Login to log file
	public async Login(userId: number, userRole: Role): Promise<void> {
		const time = this.GetTime();
		const logMessage = `${time} - User Login - UserId: ${userId} - Role: ${userRole}\n`;
		await this.appendLogMessage(logMessage, this.logFilePath);
	}

	// Write acces log message to log file
	public async Access(
		message: string,
		currentUser: UserType,
		requestAction: Actions,
		requestResource: UserType | Course | Review | Submissions,
		requestResult: boolean
	): Promise<void> {
		const time = this.GetTime();
		const logMessage = `${time} - ${message} - User: ${currentUser.Name} - Role: ${currentUser.Role} - Action: ${requestAction} - Resource: ${requestResource} - Result: ${requestResult}\n`;
		await this.appendLogMessage(logMessage, this.logFilePath);
	}
	// Write error log message to log file
	public async Error(error: Error): Promise<void> {
		const time = this.GetTime();
		const logMessage = `${time} - ${error.cause} - Error: ${error.message}\n`;
		await this.appendLogMessage(logMessage, this.logFilePath);
	}

	// Async function to append log messages to the log file, ensuring the directory exists and handling any errors that may occur during the file writing process
	// This function
	private async appendLogMessage(logMessage: string, logFilePath: string): Promise<void> {
		try {
			// Ensuring the directory exists before writing to the log file, if it doesn't exist it will be created
			// recursive: true creates all missing folders in the path.
			await mkdir(path.dirname(logFilePath), { recursive: true });
			// Using appendFile to add the log message to the file, if using writeFile it would overwrite the file each time
			await appendFile(logFilePath, logMessage, "utf-8");
		} catch (err) {
			console.error("Error writing to log file:", err);
		}
	}
}

export const Log = new LogModule();
