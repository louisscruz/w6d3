class TweetCompose {
  constructor() {
    this.$el = $('.tweet-compose');
    console.log(this.$el);
    this.$el.on('click', 'input[type=Submit]', event => {
    });
    this.$el.on('keyup', 'textarea', () => {
      this.updateCount();
    });
    $('.add-mentioned-user').click(this.addMentionedUser);
    // $('.remove-mentioned-user').click(this.removeMentionedUser);
    this.$el.on('click', '.remove-mentioned-user', event => {
      this.removeMentionedUser(event);
    });
  }

  submit() {
    const content = $(".tweet-compose textarea").val();
    const mentionedUserIds = $(".tweet-compose select").val();
    $.ajax({
      url: "/tweets",
      type: "POST",
      dataType: "json",
      data: {
        tweet: {
          content: content,
          mentioned_user_ids: [mentionedUserIds]
        }
      },
      success: res => {
        this.handleSuccess(res);
      }
    });
  }

  clearInput() {
    this.$el.find('textarea, select').val('');
  }

  handleSuccess(res) {
    this.clearInput();
    let $li = $('<li>');
    $li.text(`${res.content} -- ${res.user.username} -- ${res.created_at}`);
    $('#feed').prepend($li);
  }

  updateCount() {
    const value = $(this.$el.find('textarea')).val();
    let remaining = 140 - value.length;
    $('.chars-left').text(remaining);
  }

  addMentionedUser() {
    const $scriptTag = $('script[type="text/template"]');
    const select = $scriptTag.html();
    $('.mentioned-users').prepend(select);
  }

  removeMentionedUser(event) {
    console.log(event);
    console.log(event.currentTarget);
    console.log(event.target);
    const deleteTarget = $(event.currentTarget).parent();
    deleteTarget.remove();
  }
}

module.exports = TweetCompose;
