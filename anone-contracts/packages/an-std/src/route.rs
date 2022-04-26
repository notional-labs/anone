use schemars::JsonSchema;

use serde::{Deserialize, Serialize};

/// AnoneRoute is enum type to represent anone query route path
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum AnoneRoute {
    Alloc,
    #[serde(rename = "claims")]
    Claims,
    Distribution,
}