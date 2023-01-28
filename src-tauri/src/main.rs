#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use tauri::{SystemTray, SystemTrayEvent};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

#[tauri::command]
fn update_tray_title(title: &str, app_handle: tauri::AppHandle) {
    app_handle.tray_handle().set_title(title).unwrap();
}

fn main() {
    let tray = SystemTray::new().with_title("Time Tracker");
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![update_tray_title])
        .system_tray(tray)
        .on_system_tray_event(|app, event| match event {
          SystemTrayEvent::LeftClick { .. } => {
            app.tray_handle().set_title("Tracking...").unwrap();
          },
          _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
