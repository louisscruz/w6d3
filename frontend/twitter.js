const FollowToggle = require('./follow_toggle');
const UsersSearch = require('./users_search');
const TweetCompose = require('./tweet_compose');

$( () => {
  $('.follow-toggle').each(button => {
    new FollowToggle(button);
  });
  new UsersSearch();
  new TweetCompose();
});
