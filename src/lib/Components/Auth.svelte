<script lang="ts">
	let { formId = "" } = $props();
</script>

<el-dialog>
	<dialog
		id="dialog"
		aria-labelledby="dialog-title"
		class="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent"
	>
		<el-dialog-backdrop
			class="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
		></el-dialog-backdrop>

		<div
			class="flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0"
		>
			<el-dialog-panel
				class="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
			>
				<div class="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
					<div class="sm:flex sm:items-start">
						<div
							class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-500/10 sm:mx-0 sm:size-10"
						>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								data-slot="icon"
								aria-hidden="true"
								class="size-6 text-red-400"
							>
								<path
									d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</div>
						<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
							<h3 id="dialog-title" class="text-base font-semibold text-white">Pinky Promise</h3>
							<div class="mt-2 flex flex-col content-center items-center justify-center gap-2">
								<p class="text-sm text-gray-400">
									Do you pinky promise that you are the chosen user?
								</p>
								<svg
									class="h-16 w-16 fill-gray-400"
									xmlns="http://www.w3.org/2000/svg"
									version="1.1"
									x="0px"
									y="0px"
									viewBox="0 0 512 512"
									style="enable-background:new 0 0 512 512;"
									xml:space="preserve"
								>
									<g>
										<g>
											<g>
												<g>
													<path
														d="M312.471,260.706c-20.759,0-37.647-16.888-37.647-37.647v-65.882c0-20.759,16.888-37.647,37.647-37.647      s37.647,16.888,37.647,37.647v65.882C350.118,243.818,333.229,260.706,312.471,260.706z M312.471,138.353      c-10.379,0-18.823,8.444-18.823,18.824v65.882c0,10.379,8.444,18.824,18.823,18.824s18.824-8.444,18.824-18.824v-65.882      C331.294,146.798,322.85,138.353,312.471,138.353z"
													/>
												</g>
												<g>
													<path
														d="M256,260.706c-9.294,0-18.213-3.413-25.112-9.609c-3.868-3.473-4.187-9.424-0.714-13.291      c3.472-3.867,9.423-4.188,13.291-0.714c3.44,3.089,7.892,4.79,12.535,4.79c10.379,0,18.824-8.444,18.824-18.824v-65.882      c0-10.395-8.427-18.824-18.824-18.824c-10.379,0-18.824,8.444-18.824,18.824v39.266c0,5.198-4.214,9.412-9.412,9.412      c-5.198,0-9.412-4.214-9.412-9.412v-39.266c0-20.759,16.888-37.647,37.647-37.647c20.799,0,37.647,16.846,37.647,37.647v65.882      C293.647,243.818,276.759,260.706,256,260.706z"
													/>
												</g>
												<g>
													<path
														d="M227.765,204.236c-5.198,0-9.412-4.214-9.412-9.412v-37.647c0-10.395-8.427-18.824-18.824-18.824      c-10.379,0-18.824,8.444-18.824,18.824v34.475c0,5.198-4.214,9.412-9.412,9.412c-5.198,0-9.412-4.214-9.412-9.412v-34.475      c0-20.759,16.888-37.647,37.647-37.647c20.799,0,37.647,16.846,37.647,37.647v37.647      C237.176,200.022,232.963,204.236,227.765,204.236z"
													/>
												</g>
												<g>
													<path
														d="M359.529,496H152.471c-5.198,0-9.412-4.214-9.412-9.412v-48.674c0-14.653-5.706-28.428-16.067-38.789      c-13.916-13.916-21.58-32.419-21.58-52.099v-95.732c0-36.328,29.555-65.882,65.882-65.882h46.471      c20.522,0,37.667,16.417,38.22,36.596c0.581,21.208-16.395,38.698-37.632,38.698h-14.604      c25.164,29.151,36.898,66.866,33.386,104.406c-0.484,5.176-5.08,8.982-10.247,8.494c-5.176-0.484-8.978-5.072-8.494-10.247      c3.731-39.878-12.49-79.169-43.665-104.794c-3.07-2.523-4.224-6.704-2.884-10.445c1.34-3.741,4.886-6.238,8.86-6.238h37.647      c10.496,0,19.11-8.625,18.816-19.359c-0.277-10.084-8.981-18.288-19.403-18.288h-46.471c-25.949,0-47.059,21.111-47.059,47.059      v95.732c0,14.653,5.706,28.428,16.067,38.789c13.916,13.916,21.58,32.419,21.58,52.099v39.262h188.235v-23.792      c0-28.99,6.853-58.018,19.817-83.947c11.664-23.329,17.83-49.446,17.83-75.528V53.648c0-10.559-8.664-19.093-19.359-18.816      c-10.084,0.277-18.288,8.981-18.288,19.403v102.942c0,5.198-4.214,9.412-9.412,9.412c-5.198,0-9.412-4.214-9.412-9.412V54.235      c0-20.522,16.417-37.667,36.596-38.22c21.201-0.596,38.698,16.397,38.698,37.632V293.91c0,28.99-6.853,58.018-19.817,83.947      c-11.664,23.329-17.83,49.446-17.83,75.528v33.204C368.941,491.786,364.727,496,359.529,496z"
													/>
												</g>
											</g>
										</g>
									</g>
								</svg>
							</div>
						</div>
					</div>
				</div>
				<div class="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
					<button
						type="submit"
						form={formId}
						command="close"
						commandfor="dialog"
						class="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-400 sm:ml-3 sm:w-auto"
						>Yes!</button
					>
					<button
						type="button"
						command="close"
						commandfor="dialog"
						class="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto"
						>No, I lied</button
					>
				</div>
			</el-dialog-panel>
		</div>
	</dialog>
</el-dialog>
