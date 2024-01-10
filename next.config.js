/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		// call the police idgaf
		ignoreDuringBuilds: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com'
			},
			{
				protocol: 'https',
				hostname: 'avatar.vercel.sh'
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
			},
		]
	}
};

module.exports = nextConfig;
