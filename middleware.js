export const config = {
  matcher: ['/', '/:page*.html'],
};

export default function middleware(request) {
  const ua = request.headers.get('user-agent') || '';

  const isMobile = /Mobile|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

  const { pathname } = new URL(request.url);
  const alreadyMobile = pathname.startsWith('/mobile/');

  if (isMobile && !alreadyMobile) {
    const url = new URL(request.url);

    if (url.pathname === '/') {
      url.pathname = '/mobile/index.html';
    } else {
      url.pathname = '/mobile' + url.pathname;
    }

    return Response.redirect(url, 302);
  }

  return;
}
