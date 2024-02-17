plugins {
    id("org.siouan.frontend-jdk17") version "8.0.0"
    id("com.diffplug.spotless") version "6.24.0"
}

frontend {
    nodeVersion.set("18.17.1")
    assembleScript.set("run build")
    cleanScript.set("run clean")
    checkScript.set("run lint")
}