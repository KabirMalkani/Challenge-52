

Vue.component('profile-video', {
  template: `
      <div :class="itemid" align="center">
        <video loop preload="metadata">
          <source :src="base + video.file" type="video/mp4">
        </video>
      </div>
  `,
  props: {
    video: Object
  },
  computed: {
    itemid(){
      return "item-"+String(this.video.id) + " elem"
    }
    // maybe save html of carousel and append hacky
  },
  data: function(){
    return {
      base: "http://127.0.0.1:8000/"
    }
  },
  mounted: function(){
    // console.log(this);
    let last = this.$parent.$data.newestid === this.video.id;
    console.log(last);
    console.log(this.$parent.$data.newestid, this.video.id);

    if(last){
      // this.$nextTick(function(){
        $("#profile-carousel").remove();
        $('#uploaded').append('<div id="profile-carousel" class="carousel" ></div>');  
        $("#profile-carousel").html($("#pc-copy").html());
        console.log('pre-attach');
        bulmaCarousel.attach('#profile-carousel', {
          slidesToScroll: 1,
          slidesToShow: 3,
          infinite: true,
          pagination: false
        });
        console.log('post-attach');
        video_conf()
      // })
    }

  },

});


new Vue({
   el: '#uploaded',
   data: {
    videos: [],
    video: {url: "", title:"", id: 0},
    ordering: "new2old",
    newestid: 24
   },
   mounted: function(){
      axios.get('/app/videolist')
      .then((response) => {
        this.videos = response['data']['videos']
        this.newestid = this.videos[this.videos.length - 1]['id']
      }, (error) => {
        console.log(error);
      });
    },
   methods: {
    uploadVideo(input) {
      let formData = new FormData($("#vidupload")[0]);
      // formData['csrfmiddlewaretoken'] = '{{ csrf_token }}';
      axios.post('/app/upload/', formData, {'Content-Type': 'multipart/form-data' })
      .then((response) => {
        this.videos = response['data']['videos']
        this.newestid = this.videos[this.videos.length - 1]['id']
        console.log(this.newestid)
      }, (error) => {
        console.log(error);
      });
      this.$forceUpdate();
    },
    deleteVideos(input) {
      axios.get('/app/deletevideos')
      .then((response) => {
        this.videos = []
      }, (error) => {
        console.log(error);
      });
    }
	}
});
