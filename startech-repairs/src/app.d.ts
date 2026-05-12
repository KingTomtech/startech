/// <reference types="@sveltejs/kit" />

declare global {
	namespace App {
		interface Locals {
			user: import('pocketbase').Record | null;
		}
	}
}

export {};
