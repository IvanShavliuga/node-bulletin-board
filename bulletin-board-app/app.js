new Vue({
  el: '#events',

  data: {
    event: { title: '', detail: '', date: '', user: '' },
    events: [],
    users:[]
  },

  ready: function () {
    this.fetchEvents();
    this.fetchUsers();
  },

  methods: {

    fetchEvents: function () {
      var events = [];
      this.$http.get('/api/events')
        .success(function (events) {
          this.$set('events', events);
          console.log(events);
        })
        .error(function (err) {
          console.log(err);
        });
    },

    fetchUsers: function () {
      var users = [];
      this.$http.get('/api/users')
        .success(function (users) {
          this.$set('users', users);
          console.log(users);
        })
        .error(function (err) {
        	 console.log("ERROR: ")
          console.log(err);
        });
    },

    addEvent: function () {
      if (this.event.title.trim()) {
        this.$http.post('/api/events', this.event)
          .success(function (res) {
            this.events.push(this.event);
            console.log('Event added!');
          })
          .error(function (err) {
            console.log(err);
          });
      }
    },

    deleteEvent: function (id) {
      if (confirm('Are you sure you want to delete this event?')) {        
        this.$http.delete('api/events/' + id)
          .success(function (res) {
            console.log(res);
            var index = this.events.find(x => x.id === id)
            this.events.splice(index, 1);
          })
          .error(function (err) {
            console.log(err);
          });
      }
    }
  }
});