"use client"

import Div from "../components/Div"
import Table from "../components/Table"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:px-24 py-12">
      <div className="container flex-col px-40">
        <div className="flex flex-row-reverse">
          <button className="btn">Add User</button>
        </div>

        <button className="btn" onClick={() => window.my_modal_1.showModal()}>
          open modal
        </button>
        <dialog id="my_modal_1" className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click the button below to close</p>
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
              <button className="btn">Close</button>
              <button className="btn">Close</button>
            </div>
          </form>
        </dialog>

        <Table></Table>
        <Div></Div>

      </div>
    </main>
  )
}
