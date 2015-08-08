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

  Discourse.FacebookLink = Discourse.View.extend(Discourse.StringBuffer, {
    tagName: 'a',
    classNames: ['share-facebook'],
    attributeBindings: ['title'],
    title: I18n.t('share.facebook'),
    click: function() {
      var title = this.get('controller.content.title');
      var link = Discourse.AbsolutePath(this.get('controller.content.url'));
      var url = "http://www.facebook.com/sharer.php?u=" + encodeURIComponent(link) + '&t=' + encodeURIComponent(title);
      Discourse.OpenSharingPopup(url);
    },
    renderString: function(buffer) {
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

  Discourse.TwitterLink = Ember.View.extend(Discourse.StringBuffer, {
    tagName: 'a',
    classNames: ['share-twitter'],
    attributeBindings: ['title'],
    title: I18n.t('share.twitter'),
    click: function() {
      var title = this.get('controller.content.title');
      var link = Discourse.AbsolutePath(this.get('controller.content.url'));
      var url = "http://twitter.com/intent/tweet?url=" + encodeURIComponent(link) + "&text=" + encodeURIComponent(title);
      Discourse.OpenSharingPopup(url, 265);
    },
    renderString: function(buffer) {
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

  Discourse.GoogleLink = Ember.View.extend(Discourse.StringBuffer, {
    tagName: 'a',
    classNames: ['share-google'],
    attributeBindings: ['title'],
    title: I18n.t('share.google+'),
    click: function() {
      var link = Discourse.AbsolutePath(this.get('controller.content.url'));
      var url = "https://plus.google.com/share?url=" + encodeURIComponent(link);
      Discourse.OpenSharingPopup(url, 600);
    },
    renderString: function(buffer) {
      buffer.push("<i class='fa fa-google-plus-square'></i>");
    }
  });

  Discourse.EmailButton = Discourse.ButtonView.extend({
    text: 'Email',
    classNames: ['share-email'],
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

  Discourse.EmailLink = Ember.View.extend(Discourse.StringBuffer, {
    tagName: 'a',
    classNames: ['share-email'],
    attributeBindings: ['title'],
    title: I18n.t('share.email'),
    click: function() {
      var title = this.get('controller.content.title');
      var subject = encodeURIComponent('[' + Discourse.SiteSettings.title + '] ' + title);
      var link = Discourse.AbsolutePath(this.get('controller.content.url'));
      var url = "mailto:?to=&subject=" + subject + "&body=" + encodeURIComponent(link);
      window.open(url, '_blank');
    },
    renderString: function(buffer) {
      buffer.push("<i class='fa fa-envelope-square'></i>");
    }
  });

  Discourse.MegaSocialButtonView = Ember.View.create({
    tagName: 'button',
    classNames: ['btn', 'btn-standard'],
    templateName: 'social-button',
    elementId: 'mega-social-button',
    name: 'megaSocial',
    sources: [Discourse.TwitterLink, Discourse.FacebookLink, Discourse.GoogleLink, Discourse.EmailLink]
  });

  Discourse.TopicFooterButtonsView.reopen({
    addAdditionalButtons: function() {
      this.attachViewClass(Discourse.FacebookButton);
      this.attachViewClass(Discourse.TwitterButton);
      this.attachViewClass(Discourse.GoogleButton);
      this.attachViewClass(Discourse.EmailButton);
      this.attachViewClass(Discourse.MegaSocialButtonView);
      setTimeout(function() {
        // replace existing share button
        $('#topic-footer-buttons .btn.share').replaceWith($('#mega-social-button'));
      }, 50);
    }.on("additionalButtons")
  });

})();
