use std::convert::Infallible;
use axum::{response::Html, routing::{get, post}, http::StatusCode, Router, Form};
use rust_embed::{Embed, RustEmbed};
use serde::{Deserialize, Serialize};
use pickledb::{PickleDb, PickleDbDumpPolicy, SerializationMethod};
use std::sync::Mutex;
use axum::extract::Path;
use axum::response::Redirect;
use axum_embed::ServeEmbed;
use lazy_static::lazy_static;
use rand::{Rng, distributions::Alphanumeric};
use tower::ServiceExt;

#[derive(RustEmbed, Clone)]
#[folder = "web/"]
struct Assets;

lazy_static! {
    static ref DB: Mutex<PickleDb> = Mutex::new(PickleDb::load("data.db", PickleDbDumpPolicy::AutoDump, SerializationMethod::Bin).unwrap_or(PickleDb::new("data.db", PickleDbDumpPolicy::AutoDump, SerializationMethod::Bin)));
}

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/", get(redirect))
        .nest_service("/favicon.ico", ServeEmbed::<Assets>::new())
        .nest_service("/asset/", ServeEmbed::<Assets>::new())
        .route("/load/:key", post(load_note))
        .route("/save/:key", post(save_note))
        .route("/:key", get(show_html))
        ;

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn redirect() -> Redirect {
    let mut rng = rand::thread_rng();
    let r : String = std::iter::repeat(())
        .map(|()| rng.sample(Alphanumeric))
        .map(char::from)
        .take(6)
        .collect();
    Redirect::temporary(&*("/".to_owned() + &*r))
}

async fn show_html(Path(payload) : Path<String>) -> Result<Html<String>, Infallible> {
    let index_html = Assets::get("index.html").unwrap();
    let string = std::str::from_utf8(index_html.data.as_ref()).unwrap().to_string();
    Ok(Html(string.replace("${uri}", &*payload)))
}

async fn load_note(Path(payload) : Path<String>) -> (StatusCode, Html<String>) {
    let db = DB.lock().unwrap();
    let content = db.get::<String>(&*payload).unwrap_or("".parse().unwrap());
    (StatusCode::OK, Html(content))
}

async fn save_note(
    Form(payload): Form<SaveNote>,
) -> StatusCode {
    let mut db = DB.lock().unwrap();
    db.set(&*payload.id, &payload.content).unwrap();
    StatusCode::CREATED
}

#[derive(Deserialize, Serialize)]
struct SaveNote {
    id: String,
    content: String,
}
