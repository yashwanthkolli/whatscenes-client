import AccountSidebar from "@/components/composed/AccountSidebar"

import "./SettingsPage.styles.scss"

export default function SettingsPage() {
  return (
    <div className="account-page">
      <AccountSidebar activeItem="settings" />

      <main className="account-page__content">
        <h1 className="account-page__title">Settings</h1>
      </main>
    </div>
  )
}
