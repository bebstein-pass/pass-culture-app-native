#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail

if [ "$#" -lt 2 ]; then
  echo "Not enough arguments supplied. Please provide platform ('ios', 'android', or 'web) and environment ('testing' or 'staging')."
  exit 1
elif [[ $1 != "ios" && $1 != "android" && $1 != "web" ]]; then
  echo "Invalid platform: $1. Please provide either 'ios', 'android', or 'web'."
  exit 1
elif [[ $2 != "testing" && $2 != "staging" ]]; then
  echo "Invalid environment: $2. Please provide either 'testing' or 'staging'."
  exit 1
fi

platform=$1
env=$2
if [ "$#" -eq 2 ]; then
  tests_path=".maestro/tests"
else
  tests_path="$3"
fi

parse_env_variable () {
  local line
  line=$(grep -E "$1=" "$2")
  if [[ $line =~ \'(.*)\' ]]; then
    echo "${BASH_REMATCH[1]}"
  elif [[ $line =~ \=(.*) ]]; then
    echo "${BASH_REMATCH[1]}"
  else
    echo "Error: the key \"$1\" was not found in $2" >&2
    exit 1
  fi
}

if [ "$platform" = "ios" ]; then
  app_id=$(parse_env_variable IOS_APP_ID ".env.$env")
  echo "Running iOS tests on $env environment with app id: $app_id"
elif [ "$platform" = "android" ]; then
  app_id=$(parse_env_variable ANDROID_APP_ID ".env.$env")
  echo "Running Android tests on $env environment with app id: $app_id"
elif [ "$platform" = "web" ]; then
  app_id=$(parse_env_variable APP_PUBLIC_URL ".env.$env")
  echo "Running Web tests on $env environment with app id: $app_id"
fi

password=$(parse_env_variable PASSWORD .maestro/.env.secret)

ts-node --compilerOptions '{"module": "commonjs"}' ./scripts/enableNativeAppRecaptcha.ts "$env" false
maestro test --env APP_ID="$app_id" --env USERNAME="dev-tests-e2e@passculture.team" --env USERNAME_UNKNOWN="dev-tests-e2e-unknown@passculture.team" --env NEW_USERNAME="dev-tests-e2e-new@passculture.team" --env NUMBER_PHONE="0607080910" --env PASSWORD="$password" --env PHYSICAL_OFFER="OPSIS - 1 MOIS" --env EVENT_OFFER="Jeu de piste : le cambrioleur de la butte Montmartre" --env MESSAGE_CODE_VALIDATION_TELEPHONE="Code de validation du telephone" "$tests_path"
ts-node --compilerOptions '{"module": "commonjs"}' ./scripts/enableNativeAppRecaptcha.ts "$env" true
