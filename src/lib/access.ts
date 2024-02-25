import { AnonymousIdentity } from '@dfinity/agent'

import { access_control as defaultBackendActor } from '@/declarations/access_control'

import { getActor, prepareLoginButton, seedToIdentity } from './identity'

const main = async () => {
    setupListeners()
    prepareLoginButton(render)
    renderTable()
    poll()
}

document.addEventListener('DOMContentLoaded', main)

const render = () => {
    const identity = (window as any).identity
    const output = document.querySelector('#output')
    if (!output) throw new Error('Output element not found')
    if (identity) {
        output.innerHTML = identity.getPrincipal().toString()
        document.querySelector('#increment')?.removeAttribute('disabled')
        getCount()
        renderTable()
    } else {
        output.innerHTML = ''
        document.querySelector('#increment')?.setAttribute('disabled', 'true')
    }
}

const setupListeners = () => {
    document.querySelector('#increment')?.addEventListener('click', increment)

    document.querySelector('#secret')?.addEventListener('input', handleChange)
}

const handleChange = async event => {
    const { value } = event.target
    try {
        const identity = seedToIdentity(value)
        const output = document.querySelector('#output')
        if (!output) throw new Error('Output element not found')
        if (identity) {
            ;(window as any).identity = identity
        }
    } catch (error) {
        console.error(error)
    }
    render()
}

document.querySelector('#form')?.addEventListener('submit', async event => {
    event.preventDefault()
    return false
})

const getCount = async () => {
    const identity = (window as any).identity || new AnonymousIdentity()
    const actor = getActor(identity)
    const count = await actor.myCount()
    document.querySelector('#count').innerHTML = count.toString()
    return count
}

const renderTable = async () => {
    const counts = JSON.parse(await defaultBackendActor.getCounts())
    counts.forEach(({ principal, count }) => {
        const existingRow = document.getElementById(principal)
        if (existingRow) {
            ;(existingRow.querySelector(`td:nth-child(2)`) as HTMLElement).innerText = count
            return
        }
        const row = document.createElement('tr')
        row.id = principal
        const principalCell = document.createElement('td')
        principalCell.innerText = principal
        const countCell = document.createElement('td')
        countCell.innerText = count
        row.appendChild(principalCell)
        row.appendChild(countCell)
        document.querySelector('#table tbody')?.appendChild(row)
    })
}

function increment() {
    if (!(window as any).identity) return
    getActor((window as any).identity)
        .increment()
        .then(count => {
            document.querySelector('#count').innerHTML = count.toString()
            renderTable()
        })
}

function poll() {
    setInterval(() => {
        getCount()
        renderTable()
    }, 5000)
}
