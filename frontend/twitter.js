const FollowToggle = require('./follow_toggle');
const UsersSearch = require('./users_search');

$( () => {
  $('.follow-toggle').each(() => {
    new FollowToggle();
  });
  new UsersSearch();
});
