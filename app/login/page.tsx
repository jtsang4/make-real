'use client'
import { useFormState } from 'react-dom'
import { login } from '../actions/auth'

type InitialData = {
	error: {
		name: string
		message: string
	} | null
}

const initialData: InitialData = {
	error: null,
}

export default function Login() {
	const [actionData, formAction] = useFormState<InitialData, FormData>(login, initialData)
	return (
		<div className="h-screen">
			<div className="flex min-h-full flex-col justify-center">
				<div className="mx-auto w-full max-w-md px-8">
					<form className="space-y-6" action={formAction}>
						<div>
							<label htmlFor="username" className="block text-sm font-medium text-gray-700">
								Username
							</label>
							<div className="mt-1">
								<input
									id="username"
									required
									autoFocus
									name="username"
									type="username"
									autoComplete="username"
									aria-invalid={actionData?.error?.name === 'username' ? true : undefined}
									aria-describedby="username-error"
									className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
								/>
								{actionData?.error?.name === 'username' ? (
									<div className="pt-1 text-red-700" id="username-error">
										{actionData.error.message}
									</div>
								) : null}
							</div>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700">
								Password
							</label>
							<div className="mt-1">
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									aria-invalid={actionData?.error?.name === 'password' ? true : undefined}
									aria-describedby="password-error"
									className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
								/>
								{actionData?.error?.name === 'password' ? (
									<div className="pt-1 text-red-700" id="password-error">
										{actionData.error.message}
									</div>
								) : null}
							</div>
						</div>

						<button
							type="submit"
							className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
						>
							Log in
						</button>
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<input
									id="remember"
									name="remember"
									type="checkbox"
									className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
								/>
								<label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
									Remember me
								</label>
							</div>
							{/* <div className="text-center text-sm text-gray-500">
								Don&apos;t have an username?{' '}
								<Link
									className="text-blue-500 underline"
									href={{
										pathname: '/join',
										query: searchParams.toString(),
									}}
								>
									Sign up
								</Link>
							</div> */}
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
