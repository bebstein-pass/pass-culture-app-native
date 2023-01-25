{
  inputs.nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
  inputs.nixpkgs-old.url = "github:nixos/nixpkgs/nixpkgs-21.11-darwin";
  inputs.flake-utils.url = "github:numtide/flake-utils";

  inputs.git-gamble.url = "gitlab:pinage404/git-gamble";
  inputs.git-gamble.inputs.nixpkgs.follows = "nixpkgs";
  inputs.git-gamble.inputs.flake-utils.follows = "flake-utils";

  outputs =
    { self
    , nixpkgs
    , nixpkgs-old
    , flake-utils
    , git-gamble
    }:
    flake-utils.lib.eachDefaultSystem (system: {
      devShell =
        let
          pkgs = nixpkgs.legacyPackages.${system};
          pkgs-old = nixpkgs-old.legacyPackages.${system};

          node_via_fnm = pkgs.writeShellScriptBin "node" ''
            ${pkgs.fnm}/bin/fnm exec node "$@"
          '';
          npm_via_fnm = pkgs.writeShellScriptBin "npm" ''
            ${pkgs.fnm}/bin/fnm exec npm "$@"
          '';
          npx_via_fnm = pkgs.writeShellScriptBin "npx" ''
            ${pkgs.fnm}/bin/fnm exec npx "$@"
          '';
        in
        pkgs.mkShell {
          packages = with pkgs; [
            nix # ensure to have always the same version

            git-gamble.packages.${system}.git-gamble # tools that blend TCR + TDD to make sure to develop the right thing, babystep by babystep

            # jdk8 # android stuff
            jdk11 # VSCode's SonarLint extension
            # cocoapods
            # gnused
            bundler
            # gcc
            # rbenv
            fnm
            node_via_fnm
            npm_via_fnm
            npx_via_fnm

            # (yarn.override {
            #   nodejs = nodejs-16_x;
            # })
            # (yarn.override {
            #   nodejs = nodejs-18_x;
            # })
            # (yarn.override {
            #   nodejs = node_via_fnm;
            # })
            yarn
            # (yarn.override {
            #   nodejs = pkgs.writeShellScriptBin "node" ''
            #     /usr/bin/env node "$@"
            #   '';
            # })
            # nodePackages.yarn
            # (nodePackages.yarn.override {
            #   nodejs = pkgs.writeShellScriptBin "node" ''
            #     /usr/bin/env node "$@"
            #   '';
            # })
            # (mkYarnPackage {
            #   src = ./.;
            #   sha1 = pkgs.fakeSha1;
            #   extraBuildInputs = [
            #     (pkgs.writeShellScriptBin "node" ''
            #       /usr/bin/env node "$@"
            #     '')
            #   ];
            # })
          ];

          shellHook = ''
            export NODE=$(which node)

            # without this NODE_OPTIONS
            # yarn script fails with
            # error:0308010C:digital envelope routines::unsupported
            export NODE_OPTIONS="--openssl-legacy-provider"
          '';
        };
    });
}
