#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use tauri::SystemTray;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

#[tauri::command]
fn update_tray_title(_title: &str, _app_handle: tauri::AppHandle) {
  #[cfg(target_os = "macos")]
  _app_handle.tray_handle().set_title(_title).unwrap();
}

fn main() {
  #[cfg(not(target_os = "macos"))]
  let tray = SystemTray::new();

  #[cfg(target_os = "macos")]
  let tray = SystemTray::new().with_title("Time Tracker");

  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![update_tray_title])
    .system_tray(tray)
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
