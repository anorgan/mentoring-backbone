
var Contact = Backbone.Model.extend({
    defaults: {
        photo: "http://placekitten.com/200/150"
    }
});

var Directory = Backbone.Collection.extend({
    model: Contact
});

var ContactView = Backbone.View.extend({
    tagName: "article",
    className: "well col-md-4 contact-container",
    template: $("#contactTemplate").html(),

    render: function () {
        var tmpl = _.template(this.template);

        this.$el.html(tmpl(this.model.toJSON()));
        return this;
    }
});

var DirectoryView = Backbone.View.extend({
    el: $("#contacts"),

    initialize: function (contacts) {
        this.collection = new Directory(contacts);
        this.render();
    },

    render: function () {
        var that = this;

        _.each(this.collection.models, function (item) {
            that.renderContact(item);
        }, this);
    },

    renderContact: function (item) {
        var contactView = new ContactView({
            model: item
        });
        this.$el.append(contactView.render().el);
    }
});