{ pkgs }: {
	deps = [
    pkgs.nodejs_20
    pkgs.neofetch
		pkgs.imagemagick
		pkgs.speedtest-cli
		pkgs.jellyfin-ffmpeg
		pkgs.git
		pkgs.python311Packages.python
	];
}
