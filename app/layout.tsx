import './globals.css';

import Nav from './nav';
import Toast from './toast';
import { Suspense } from 'react';
import SessionProvider from '../components/SessionProvider';
import { getServerSession } from "next-auth"
import { Toaster } from 'react-hot-toast';

export const metadata = {
	title: 'Branch Testing Tracker',
	description:
    'A tool to keep track of which branch is deployed where and by whom'
};

export default async function RootLayout({
	children
}: {
  children: React.ReactNode;
}) {

	const session = await getServerSession();

	return (
		<html lang="en" className="h-full bg-gray-50">
			<SessionProvider session={session}>
				<body className="h-full">
					<Suspense>
						<Nav />
					</Suspense>
					<Toaster />
					{children}
					<Toast />
				</body>
			</SessionProvider>
		</html>
	);
}
