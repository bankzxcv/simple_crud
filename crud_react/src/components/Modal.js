import { modalControlState, userModalState } from "../Context/ModalState"
import { useRecoilValue, useSetRecoilState } from "recoil"

import { useEffect } from "react"
import { useFormik } from "formik"

export const useModal = () => {
  // const setOpen = useSetRecoilState(modalControlState)
  return {
    openModal: () => {
      window.my_modal_1.showModal()
    },
  }
}

const RemoveForm = ({ formik, moreProp }) => {
  const { values: user } = formik
  return (
    <>
      <div className="grid gap-4 grid-cols-3 sm:grid-cols-2">
        <div>
          <label className="p-2 block text-sm font-medium leading-6 text-gray-900">Name</label>
          <input
            className="mx-2 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm text-sm"
            type="text"
            disabled
            id="name"
            name="name"
            value={user.name || ""}
          />
        </div>
        <div>
          <label className="p-2 block text-sm font-medium leading-6 text-gray-900">Telephone</label>
          <input
            className="mx-2 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm text-sm"
            type="telephone"
            disabled
            id="tel"
            name="tel"
            value={user.tel || ""}
          />
        </div>
        <div>
          <label className="p-2 block text-sm font-medium leading-6 text-gray-900">Email</label>
          <input
            className="mx-2 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm text-sm"
            type="email"
            disabled
            id="email"
            name="email"
            value={user.email || ""}
          />
        </div>
      </div>
      <h3 className="text-red-500 text-center m-4 font-bold">Confirm to Delete</h3>
    </>
  )
}

const AddEditForm = ({ formik, moreProp }) => {
  const { state } = useRecoilValue(modalControlState)
  const user = useRecoilValue(userModalState)
  return (
    <div className="grid gap-4 grid-cols-3 sm:grid-cols-2">
      {state == "update" && (
        <div>
          <label className="p-2 block text-sm font-medium leading-6 text-gray-900">ID</label>
          <input
            className="mx-2 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm text-sm"
            id="id"
            name="id"
            type="text"
            // {...moreProp("id")}
            value={formik.values.id || ""}
            // defaultValue={user.id}
            disabled
          />
        </div>
      )}
      <div>
        <label className="p-2 block text-sm font-medium leading-6 text-gray-900">Name</label>
        <input
          id="name"
          name="name"
          className="mx-2 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm text-sm"
          type="text"
          value={formik.values.name || ""}
          onChange={formik.handleChange}
          // {...moreProp("name")}
          // defaultValue={user.name}
        />
      </div>
      <div>
        <label className="p-2 block text-sm font-medium leading-6 text-gray-900">Telephone</label>
        <input
          id="tel"
          name="tel"
          className="mx-2 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm text-sm"
          type="telephone"
          value={formik.values.tel || ""}
          onChange={formik.handleChange}
          // {...moreProp("tel")}
          // defaultValue={user.tel}
        />
      </div>
      <div>
        <label className="p-2 block text-sm font-medium leading-6 text-gray-900">Email</label>
        <input
          id="email"
          name="email"
          className="mx-2 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm text-sm"
          type="email"
          value={formik.values.email || ""}
          onChange={formik.handleChange}
          // {...moreProp("email")}
          // defaultValue={user.email}
        />
      </div>
    </div>
  )
}

export const ModalComponent = ({}) => {
  const { state, fn } = useRecoilValue(modalControlState)
  const user = useRecoilValue(userModalState)
  const setUser = useSetRecoilState(userModalState)
  const closeForm = () => {
    setUser({})
    window.my_modal_1.close()
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: user.id,
      name: user.name,
      tel: user.tel,
      email: user.email,
    },
    onSubmit: async values => {
      // delete state
      if (state === "delete") {
        await fn()
      } else {
        // otherwise; create or update
        await fn(values)
        formik.resetForm()
      }
      closeForm()
    },
  })

  const moreProp = name => ({
    ...formik.getFieldProps(name),
  })

  useEffect(() => {
    const eventOnClose = e => {
      setUser({})
    }
    const dom = document.getElementById("my_modal_1")
    dom.addEventListener("close", eventOnClose)
    return () => dom.removeEventListener("close", eventOnClose)
  }, [])

  return (
    <dialog id="my_modal_1" className="modal">
      <form method="dialog" onSubmit={formik.handleSubmit} className="modal-box">
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-center">{`${state}`.toUpperCase()}</h3>
          {state === "delete" && <RemoveForm formik={formik} moreProp={moreProp}></RemoveForm>}
          {(state === "create" || state === "update") && (
            <AddEditForm formik={formik} moreProp={moreProp}></AddEditForm>
          )}
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn" type="button" onClick={closeForm}>
              Cancel
            </button>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </dialog>
  )
}
