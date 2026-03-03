export const navigateTo = (
  path: string,
  replace = false
): void => {
  if (window.location.pathname === path) {
    return;
  }

  if (replace) {
    window.history.replaceState(null, '', path);

  } else {
    window.history.pushState(null, '', path);
  }

  window.dispatchEvent(new PopStateEvent('popstate'));
};
