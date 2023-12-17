'use client';

import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

const navigation = [
  { name: 'Overview', href: '/' },
  { name: 'Deployments', href: '/deployments' },
  { name: 'Log Deployment', href: '/log-deployment' }
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({ user }: { user: any }) {
  const pathname = usePathname();

  return (
    <Disclosure as="nav" className="bg-white shadow-sm">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <svg className='fill-blue-600' width="24" height="24" viewBox="0 0 41 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M10.9851 9.60376C10.7695 10.3289 10.5062 11.2266 10.2278 12.1829C11.38 13.165 12.4739 14.0967 13.2021 14.7186C13.5015 14.0885 13.9302 13.1861 14.4195 12.1594C13.4071 10.7161 12.5625 9.51224 12.4518 9.35735C13.3896 8.8786 13.9535 7.82959 13.7718 6.73364C13.5469 5.38189 12.2724 4.47016 10.9245 4.69663H10.9233H10.9221C9.57424 4.92426 8.66437 6.20326 8.88805 7.55619C9.07096 8.65331 9.94355 9.45944 10.9851 9.60376Z"></path> <path d="M27.776 14.7193C28.5169 14.088 29.6365 13.1341 30.8096 12.1331C30.537 11.1956 30.2784 10.3156 30.0664 9.60214C31.1079 9.45664 31.9805 8.65051 32.1622 7.55456C32.3871 6.20281 31.476 4.92264 30.1281 4.695H30.127H30.1258C28.7779 4.46736 27.5034 5.37909 27.2785 6.73201C27.0968 7.82796 27.6606 8.87698 28.5985 9.35572C28.4866 9.51296 27.6164 10.7521 26.583 12.227C27.056 13.2115 27.4777 14.0951 27.776 14.7193Z"></path> <path d="M38.3088 10.0161C39.7954 10.0161 41 8.80751 41 7.31612C41 5.82474 39.7954 4.61614 38.3088 4.61614C36.8223 4.61614 35.6177 5.82474 35.6177 7.31612C35.6177 8.23489 36.0755 9.04453 36.7745 9.53267C34.9863 11.051 28.1244 16.9016 28.1244 16.9016C28.1244 16.9016 27.6828 17.3698 27.2658 17.2794C26.8126 17.1809 26.512 16.4322 26.512 16.4322C26.512 16.4322 21.6365 6.23308 21.3743 5.69801C22.5533 5.32604 23.4084 4.22188 23.4084 2.91589C23.4084 1.30599 22.1071 0 20.5017 0H20.5006H20.4994C18.894 0 17.5927 1.30482 17.5927 2.91589C17.5927 4.22188 18.4478 5.32604 19.6268 5.69801C17.9131 9.20529 14.4892 16.4322 14.4892 16.4322C14.4892 16.4322 14.1886 17.182 13.7354 17.2794C13.3172 17.3698 12.8756 16.9016 12.8756 16.9016C12.8756 16.9016 6.01375 11.051 4.22547 9.53267C4.92447 9.04571 5.38232 8.23489 5.38232 7.31612C5.38232 5.82474 4.1777 4.61614 2.69116 4.61614C1.20461 4.61614 0 5.82474 0 7.31612C0 8.80751 1.20461 10.0161 2.69116 10.0161C2.88455 10.0161 3.07328 9.99499 3.25619 9.95509C3.25619 9.95509 4.65652 15.1133 5.72833 19.6227C6.44247 22.8742 7.49098 28.2988 7.49913 28.3187C8.22726 30.9002 14.5078 32.022 20.4983 31.9997H20.4994H20.5006C26.491 32.022 32.7716 30.9002 33.4997 28.3187C33.5079 28.3 34.4189 22.8742 35.2181 19.6227C36.3027 15.1133 37.7427 9.95509 37.7427 9.95509C37.9256 9.99499 38.1143 10.0161 38.3088 10.0161ZM20.4994 30.6632C14.1967 30.6632 9.0882 29.4029 9.0882 27.8482C9.0882 26.2934 14.1967 25.0332 20.4994 25.0332C26.8021 25.0332 31.9106 26.2934 31.9106 27.8482C31.9106 29.4029 26.8021 30.6632 20.4994 30.6632Z"></path> </svg>
                </div>
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        pathname === item.href
                          ? 'border-slate-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                      )}
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="h-8 w-8 rounded-full"
                        src={user?.image || 'https://avatar.vercel.sh/leerob'}
                        height={32}
                        width={32}
                        alt={`${user?.name || 'placeholder'} avatar`}
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {user ? (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'flex w-full px-4 py-2 text-sm text-gray-700'
                              )}
                              onClick={() => signOut()}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      ) : (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'flex w-full px-4 py-2 text-sm text-gray-700'
                              )}
                              onClick={() => signIn('github')}
                            >
                              Sign in
                            </button>
                          )}
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? 'bg-slate-50 border-slate-500 text-slate-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                  )}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 pb-3">
              {user ? (
                <>
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <Image
                        className="h-8 w-8 rounded-full"
                        src={user.image}
                        height={32}
                        width={32}
                        alt={`${user.name} avatar`}
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <button
                      onClick={() => signOut()}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                      Sign out
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-3 space-y-1">
                  <button
                    onClick={() => signIn('github')}
                    className="flex w-full px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Sign in
                  </button>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
