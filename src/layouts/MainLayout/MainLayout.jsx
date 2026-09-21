import { Outlet } from "react-router-dom"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

import ToastContainer from "@/components/feedback/toast/ToastContainer"
import ModalRoot from "@/components/feedback/modal/ModalRoot"
import LoadingBar from "@/components/feedback/loading/LoadingBar"

import "./MainLayout.styles.scss"

export default function MainLayout() {
  return (
    <div className="main-layout">
      <LoadingBar />

      <Header />

      <main className="main-layout__content">
        <Outlet />
      </main>

      {/* <Footer /> */}

      <ToastContainer />
      <ModalRoot />
    </div>
  )
}
