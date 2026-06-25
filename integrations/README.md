# Local Integrations

This folder is for local deployments of the four upstream projects used by the trend macro research page.

## Current Status

| Project | Local status | Path | Notes |
| --- | --- | --- | --- |
| digital-oracle | deployed | `integrations/digital-oracle` | Shallow cloned successfully. Local `SKILL.md`, providers, references, scripts, and tests are present. |
| a-stock-data | deployed | `integrations/a-stock-data` | Shallow cloned successfully. Local `SKILL.md`, README, assets, and license are present. |
| worldmonitor | pending | `integrations/worldmonitor` | `git clone --depth 1` failed because GitHub transfer disconnected. Retry when network is stable. |
| Qlib | pending | `integrations/qlib` | `git clone --depth 1` and GitHub archive download timed out. `pyqlib` is not installed locally. |

## Retry Commands

```bash
git clone --depth 1 https://github.com/koala73/worldmonitor.git integrations/worldmonitor
git clone --depth 1 https://github.com/microsoft/qlib.git integrations/qlib
```

If large Git transfers keep failing, retry with source archives:

```bash
curl -L -o /tmp/worldmonitor.zip https://github.com/koala73/worldmonitor/archive/refs/heads/main.zip
curl -L -o /tmp/qlib.zip https://github.com/microsoft/qlib/archive/refs/heads/main.zip
```

## Deployment Boundary

- `worldmonitor` is a standalone web app. After local source is available, follow its README and run its dev server separately, then point the capability page to the local service.
- `Qlib` is a Python quant research platform, not a browser UI. Deploy it as a Python package or service API, then expose selected workflows to this page.
- `digital-oracle` and `a-stock-data` are local skill/data packages. They are available as local source and documentation now; the next step is a backend bridge if the web page should execute them directly.
