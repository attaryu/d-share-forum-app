function getTitle(href) {
  let title;

  if (href.includes('thread')) {
    title = 'Thread';
  } else if (href.includes('leaderboards')) {
    title = 'Leaderboards';
  } else if (href.includes('/profile')) {
    title = 'Profile';
  } else if (href.includes('/')) {
    title = 'Home';
  }

  return title;
}

export default getTitle;
