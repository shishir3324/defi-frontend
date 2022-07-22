<template>
  <div>
    <div class="container pt-5">
       <div class="progress-big-con bg-light d-flex position-relative" style="width:500px; height:31px border-radius: 15px;">

           <div class="bg-primary position-relative bar-portion" style="height: 31px; width: 20%">
              <div class="bar-holder">&#60;&#62;</div>
          </div>

          <div class="bg-danger position-relative bar-portion" style="height: 31px; width: 20%">
              <div class="bar-holder">&#60;&#62;</div>
          </div>

          <div class="bg-success position-relative bar-portion" style="height: 33px; width: 20%">
              <div class="bar-holder">&#60;&#62;</div>
          </div>

          <div class="bg-warning position-relative bar-portion" style="height: 33px; width: 20%">
              <div class="bar-holder">&#60;&#62;</div>
          </div>

          <div class="bg-info position-relative bar-portion" style="height: 33px; width: 20%">
              <!-- <div class="bar-holder">&#60;&#62;</div> -->
          </div>

      </div>

      <!-- <div style="width:50%; height: 210px" class="bg-light border border-dark position-relative">
        <div class="position-absolute" style="right: 0">Hello</div>
      </div> -->
    </div>
  </div>
</template>

<style>
  .bar-portion {
    border-right: 2px white solid;
  }
  .bar-holder{
    position: absolute;
    font-size: 0.7rem;
    background-color: white;
    border-radius: 10px;
    bottom: 25%;
    right: -9px;
    z-index: 1;
    cursor: pointer;
    width: 17px;
    text-align: center;
    height: 17px;
    user-select: none;
  }
  .bar-holder:hover{
    transform: scale(1.1);
  }
</style>