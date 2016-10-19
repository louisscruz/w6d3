class TweetCompose {
  constructor() {
    this.$el = $('.tweet-compose');
    this.$el.on('click', 'input[type=Submit]', event => {
      event.preventDefault();
      this.submit();
    });
    this.$el.on('keyup', 'textarea', event => {
      this.updateCount();
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
}

module.exports = TweetCompose;
