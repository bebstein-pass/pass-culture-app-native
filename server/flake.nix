{
  inputs.nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs =
    { self
    , nixpkgs
    , flake-utils
    }:
    flake-utils.lib.eachDefaultSystem (system: {
      devShell =
        let
          pkgs = nixpkgs.legacyPackages.${system};

          node_via_fnm = pkgs.writeShellScriptBin "node" ''
            ${pkgs.fnm}/bin/fnm exec node "$@"
          '';
          npm_via_fnm = pkgs.writeShellScriptBin "npm" ''
            ${pkgs.fnm}/bin/fnm exec npm "$@"
          '';
          npx_via_fnm = pkgs.writeShellScriptBin "npx" ''
            ${pkgs.fnm}/bin/fnm exec npx "$@"
          '';

          yarn_from_env = pkgs.writeShellScriptBin "yarn" ''
            YARN_FROM_BREW="/usr/local/bin/yarn"
            exec "$YARN_FROM_BREW" "$@"
          '';
        in
        pkgs.mkShell {
          packages = with pkgs; [
            nix # ensure to have always the same version

            fnm
            node_via_fnm
            npm_via_fnm
            npx_via_fnm

            yarn_from_env

            maestro
          ];

          shellHook = ''
            eval "$(fnm env --use-on-cd)"
            fnm use --install-if-missing

            export NODE=$(which node)
          '';
        };
    });
}
