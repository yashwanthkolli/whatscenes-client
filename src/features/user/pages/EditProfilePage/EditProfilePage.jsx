import AccountSidebar from "@/components/composed/AccountSidebar"

import "./EditProfilePage.styles.scss"

export default function EditProfilePage() {
  return (
    <div className="account-page">
      <AccountSidebar activeItem="edit-profile" />

      <main className="account-page__content">
        <h1 className="account-page__title">Edit profile</h1>
      </main>
    </div>
  )
}
