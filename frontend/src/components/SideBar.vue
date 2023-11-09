<template>
    <div class="container col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light">
        <div
            class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100"
        >
            <a
                href="/"
                class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
            >
                <span class="fs-5 d-none d-sm-inline">Menu</span>
            </a>
            <ul
                class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start text-dark"
                id="menu"
            >
                <li class="nav-item">
                    <a href="#" class="nav-link align-middle px-0">
                        <i class="fs-4 bi-house"></i>
                        <span class="ms-1 d-none d-sm-inline">Home</span>
                    </a>
                </li>
                <li>
                    <a
                        href="#submenu1"
                        data-bs-toggle="collapse"
                        class="nav-link px-0 align-middle"
                    >
                        <i class="fs-4 bi-speedometer2"></i>
                        <span class="ms-1 d-none d-sm-inline">Dashboard</span>
                    </a>
                    <ul
                        class="collapse show nav flex-column ms-1"
                        id="submenu1"
                        data-bs-parent="#menu"
                    >
                        <li class="w-100">
                            <a href="#" class="nav-link px-0">
                                <span class="d-none d-sm-inline">Item</span> 1
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-link px-0">
                                <span class="d-none d-sm-inline">Item</span> 2
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#" class="nav-link px-0 align-middle">
                        <i class="fs-4 bi-table"></i>
                        <span class="ms-1 d-none d-sm-inline">Orders</span></a
                    >
                </li>
                <li>
                    <a
                        href="#submenu2"
                        data-bs-toggle="collapse"
                        class="nav-link px-0 align-middle"
                    >
                        <i class="fs-4 bi-bootstrap"></i>
                        <span class="ms-1 d-none d-sm-inline"
                            >Bootstrap</span
                        ></a
                    >
                    <ul
                        class="collapse nav flex-column ms-1"
                        id="submenu2"
                        data-bs-parent="#menu"
                    >
                        <li class="w-100">
                            <a href="#" class="nav-link px-0">
                                <span class="d-none d-sm-inline">Item</span>
                                1</a
                            >
                        </li>
                        <li>
                            <a href="#" class="nav-link px-0">
                                <span class="d-none d-sm-inline">Item</span>
                                2</a
                            >
                        </li>
                    </ul>
                </li>
                <li>
                    <a
                        href="#submenu3"
                        data-bs-toggle="collapse"
                        class="nav-link px-0 align-middle"
                    >
                        <i class="fs-4 bi-grid"></i>
                        <span class="ms-1 d-none d-sm-inline">Products</span>
                    </a>
                    <ul
                        class="collapse nav flex-column ms-1"
                        id="submenu3"
                        data-bs-parent="#menu"
                    >
                        <li class="w-100">
                            <a href="#" class="nav-link px-0">
                                <span class="d-none d-sm-inline">Product</span>
                                1</a
                            >
                        </li>
                        <li>
                            <a href="#" class="nav-link px-0">
                                <span class="d-none d-sm-inline">Product</span>
                                2</a
                            >
                        </li>
                        <li>
                            <a href="#" class="nav-link px-0">
                                <span class="d-none d-sm-inline">Product</span>
                                3</a
                            >
                        </li>
                        <li>
                            <a href="#" class="nav-link px-0">
                                <span class="d-none d-sm-inline">Product</span>
                                4</a
                            >
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#" class="nav-link px-0 align-middle">
                        <i class="fs-4 bi-people"></i>
                        <span class="ms-1 d-none d-sm-inline">Customers</span>
                    </a>
                </li>
            </ul>
            <hr />
            <div class="dropdown pb-4">
                <a
                    href="#"
                    class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                    id="dropdownUser1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <img
                        src="https://github.com/mdo.png"
                        alt="hugenerd"
                        width="30"
                        height="30"
                        class="rounded-circle"
                    />
                    <span class="d-none d-sm-inline mx-1">loser</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                    <li>
                        <a class="dropdown-item" href="#">New project...</a>
                    </li>
                    <li><a class="dropdown-item" href="#">Settings</a></li>
                    <li><a class="dropdown-item" href="#">Profile</a></li>
                    <li>
                        <hr class="dropdown-divider" />
                    </li>
                    <li><a class="dropdown-item" href="#">Sign out</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import img from "@/image/yuai.jpg";
</script>

<style scoped>
.container {
    box-shadow: 5px 0 5px -5px gray;
}

.sidebar {
    color: white;
    background-color: var(--sidebar-bg-color);

    float: left;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0.5em;

    transition: 0.3s ease;

    display: flex;
    flex-direction: column;
}

.sidebar h1 {
    height: 2.5em;
}

.collapse-icon {
    position: absolute;
    bottom: 0;
    padding: 0.75em;

    color: rgba(255, 255, 255, 0.7);

    transition: 0.2s linear;
}

.rotate-180 {
    transform: rotate(180deg);
    transition: 0.2s linear;
}
</style>
