<template>
  <section>
    <div class="container">
      <div class="row">
        <h1 class="text-center"><span>Blogs</span></h1>
        <div class="col-md-4 mt-4">
          <div class="card profile-card-5">
            <div class="card-img-block">
              <img class="card-img-top" src="https://images.unsplash.com/photo-1517832207067-4db24a2ae47c" alt="Card image cap">
            </div>
            <div class="card-body pt-0">
            <h5 class="card-title">Florence Garza</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Read Article</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
}
</script>

<style scoped>
:hover{
    -webkit-transition: all 1s ease;
    transition: all 1s ease;
}
section{
    float:left;
    width:100%;
    background: #fff;  /* fallback for old browsers */
    padding:30px 0;
}
h1{float:left; width:100%; color:#232323; margin-bottom:30px; font-size: 14px;}
h1 span{font-family: 'Libre Baskerville', serif; display:block; font-size:45px; text-transform:none; margin-bottom:20px; margin-top:30px; font-weight:700}
h1 a{color:#131313; font-weight:bold;}



/*Profile Card 5*/
.profile-card-5{
    margin-top:20px;
}
.profile-card-5 .btn{
    border-radius:2px;
    text-transform:uppercase;
    font-size:12px;
    padding:7px 20px;
}
.profile-card-5 .card-img-block {
    width: 91%;
    margin: 0 auto;
    position: relative;
    top: -20px;
}
.profile-card-5 .card-img-block img{
    border-radius:5px;
    box-shadow:0 0 10px rgba(0,0,0,0.63);
}
.profile-card-5 h5{
    color:#4E5E30;
    font-weight:600;
}
.profile-card-5 p{
    font-size:14px;
    font-weight:300;
}
.profile-card-5 .btn-primary{
    background-color:#4E5E30;
    border-color:#4E5E30;
}
</style>
