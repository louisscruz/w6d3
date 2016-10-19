class FollowToggle {
  constructor() {
    this.$el = $('.follow-toggle');
    this.userId = this.$el.data('user-id');
    this.followState = this.$el.data('initial-follow-state');
    this.render();
    this.$el.click(e => {
      e.preventDefault();
      this.handleClick(e);
    });
  }

  render() {
    if (this.followState === 'followed') {
      this.$el.text('Unfollow!');
    } else {
      this.$el.text('Follow');
    }
  }

  handleClick(event) {
    const method = this.followState === 'followed' ? 'DELETE' : 'POST';
    this.$el.addClass('loading');
    $.ajax({
      url: `/users/${this.userId}/follow`,
      type: method,
      dataType: 'json',
      success: res => {
        this.toggleFollowState();
        this.render();
      }
    }).always(() => {
      this.$el.removeClass('loading');
    });
  }

  toggleFollowState() {
    if (this.followState === 'followed') {
      this.followState = 'unfollowed';
    } else {
      this.followState = 'followed';
    }
  }
}

module.exports = FollowToggle;
