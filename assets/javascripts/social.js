(function() {

  Discourse.AbsolutePath = function(path) {
    return window.location.protocol + '//' + window.location.host + path;
  };

  Discourse.OpenSharingPopup = function(url, height) {
    window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=600,height=' + (height || 315));
  };

  Discourse.FacebookButton = Discourse.ButtonView.extend({
    text: 'Like',
    title: I18n.t('share.facebook'),
    click: function() {
      var title = this.get('controller.content.title');
      var link = Discourse.AbsolutePath(this.get('controller.content.url'));
      var url = "http://www.facebook.com/sharer.php?u=" + encodeURIComponent(link) + '&t=' + encodeURIComponent(title);
      Discourse.OpenSharingPopup(url);
    },
    renderIcon: function(buffer) {
      buffer.push("<i class='fa fa-facebook-square'></i>");
    }
  });

  Discourse.TwitterButton = Discourse.ButtonView.extend({
    text: 'Tweet',
    title: I18n.t('share.twitter'),
    click: function() {
      var title = this.get('controller.content.title');
      var link = Discourse.AbsolutePath(this.get('controller.content.url'));
      var url = "http://twitter.com/intent/tweet?url=" + encodeURIComponent(link) + "&text=" + encodeURIComponent(title);
      Discourse.OpenSharingPopup(url, 265);
    },
    renderIcon: function(buffer) {
      buffer.push("<i class='fa fa-twitter-square'></i>");
    }
  });

  Discourse.GoogleButton = Discourse.ButtonView.extend({
    text: 'G+',
    title: I18n.t('share.google+'),
    click: function() {
      var link = Discourse.AbsolutePath(this.get('controller.content.url'));
      var url = "https://plus.google.com/share?url=" + encodeURIComponent(link);
      Discourse.OpenSharingPopup(url, 600);
    },
    renderIcon: function(buffer) {
      buffer.push("<i class='fa fa-google-plus-square'></i>");
    }
  });

  Discourse.EmailButton = Discourse.ButtonView.extend({
    text: 'Email',
    title: I18n.t('share.email'),
    click: function() {
      var title = this.get('controller.content.title');
      var subject = encodeURIComponent('[' + Discourse.SiteSettings.title + '] ' + title);
      var link = Discourse.AbsolutePath(this.get('controller.content.url'));
      var url = "mailto:?to=&subject=" + subject + "&body=" + encodeURIComponent(link);
      window.open(url, '_blank');
    },
    renderIcon: function(buffer) {
      buffer.push("<i class='fa fa-envelope-square'></i>");
    }
  });

  Discourse.TopicFooterButtonsView.reopen({
    addAdditionalButtons: function() {
      this.attachViewClass(Discourse.FacebookButton);
      this.attachViewClass(Discourse.TwitterButton);
      this.attachViewClass(Discourse.GoogleButton);
      this.attachViewClass(Discourse.EmailButton);
    }.on("additionalButtons")
  });

})();
