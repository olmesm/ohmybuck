---
title: Python for JS Devs
description: Python for JS Devs
date: 2022-12-19 11:48
tags: [python, flask, js]
draft: true
---

## Python Glossary

- [pip](https://pypi.org/project/pip/) is the equivalent of npm, but dial it back to npm v3 where npm-shrinkwrap and explicitly saving packages was a thing. Pip also installs packages globally by default - ensure to use venv.
- [venv](https://docs.python.org/3/library/venv.html) is the equivalent of node_modules, except it also bundles a python runtime. As mentioed, it's important to note that without a venv python will likely install a package globally. This commonly leads to [iwomm](https://www.urbandictionary.com/define.php?term=IWOMM) issues. Unlike node_modules your venv doesnt need to be in the root of the project either as it uses your shell path.
- requirements.txt or [pyproject.toml](https://pip.pypa.io/en/stable/reference/build-system/pyproject-toml/) is the equivalent of package.json dependencies. requirements.txt doesnt handle scripting.
- [setup.py](https://docs.python.org/3/installing/index.html#installing-index) is the is the equivalent of package.json scripts. It's dated and not always used. Modern projects would likely use [pyproject.toml](https://pip.pypa.io/en/stable/reference/build-system/pyproject-toml/), but expect to see a mix of setup.py, [Makefile](https://www.gnu.org/software/make)s, and [autoconf](https://www.gnu.org/software/autoconf)s.
- [poetry](https://python-poetry.org/) is the yarn/pnpm. It's improving things but I've seen teams complain about various issues like package resolution and compatability. poetry.lock is our yaml.lock.
- [pypi.org](https://pypi.org/) is our [npmjs.org](https://npmjs.org)
- [wheels and eggs](https://packaging.python.org/en/latest/discussions/wheel-vs-egg/) are bundled and/or compiled binary python packages. AFAIK we dont really have anything like this in js land - perhaps 0 dependency bundles like [create-react-app pre-ejection](https://stackoverflow.com/a/68320350), or [vercel pkg](https://github.com/vercel/pkg).
- [pipx](https://pypa.github.io/pipx/) is your npx.

## Deployment glossary

- [wsgi]()/[asgi]()
- gunicorn/uvicorn/Werkzeug/twisted

| Library/Framework      | Role                                |
| ---------------------- | ----------------------------------- |
| Flask/Django/FastAPI   | Web Application                     |
| Gunicorn/uvicorn/uWSGI | Web server library                  |
| WSGI/ASGI              | Web server Interface (PEP standard) |

---

Course [build as saas with flask](https://buildasaasappwithflask.com/)

## venv

```bash
# Create a venv
python3 -m venv <venv_directory>

# Activate the venv
source <venv_directory>/bin/activate

# Check venv worked
which python # => <venv_directory>/bin/python
```

## async is new to Python

JS and node in particular has always need single threaded. This meanss that in order to prevent a process (downloading an image), we put that task off the main thread and continue with the program execution. Python is generally syncronous so this means that download hold up the program exectuition.

In order to keep the app performant, tools like gunicorn and celery allow us to spin up parallel services, or push tasks off to background processes.
