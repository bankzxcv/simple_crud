import { atom } from "recoil"

export const modalControlState = atom({
  key: "modalState",
  default: {
    state: "create",
    fn: () => {},
  },
})

export const userModalState = atom({
  key: "userModalState",
  default: {},
})
