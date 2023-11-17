<template>
    <section class="page_404">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="col-sm-10 col-sm-offset-1 text-center">
                        <div class="four_zero_four_bg">
                            <h1 class="text-center">404</h1>
                        </div>
                        <div class="content_box_404">
                            <h3 class="h2">Looks Like You're Lost</h3>
                            <p>The page you are looking for not available</p>
                            <router-link to="/">
                                <a href="#">Go to Home</a>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.page_404 {
    padding: 40px 0;
    background: #fff;
    font-family: "Poppins";
    margin-top: 10em;
    padding: 0;
    box-sizing: border-box;
    font-family: "poppins";
}

.page_404 img {
    width: 100%;
}

.four_zero_four_bg {
    background: url("@/assets/image/not-found-bg.gif");
    height: 400px;
    background-position: center;
}

h1 {
    font-size: 80px;
}

h3 {
    font-size: 80px;
}

a {
    color: #fff;
    text-decoration: none;
    padding: 10px 20px;
    background: #39ac31;
    display: inline-block;
}

.content_box_404 {
    margin-top: -50px;
}
a:hover {
    text-decoration: none;
    color: #fff;
}
</style>
