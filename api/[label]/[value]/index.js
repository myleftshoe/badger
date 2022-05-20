module.exports = (req, res) => {
    const { label, value, ...options } = req.query
    const svg = makeShield(label, value, options) 
    res.setHeader('content-type', 'image/svg+xml')
    res.send(svg)
}

const defaultOptions = {
    labelColor: 'orange',
    valueColor: '#777',
    fontSize: '.8rem',
}

function makeShield(label, value, options = {}) {
    label = label ?? 'label'
    value = value ?? 'value'
    options = {...defaultOptions, ...options }
    console.log({options})
    return `<svg fill="none" viewBox="0 0 300 50" width="300" height="50" xmlns="http://www.w3.org/2000/svg">
        <style>
            shield {
                position: relative;
                margin: 5px;
                display:flex;
                color: white;
                font-size: ${options.fontSize};
                font-family: 'DejaVu Sans Mono', Verdana, DejaVu Sans, sans-serif;
            }
            label {
                background-color: ${options.labelColor};
                padding: 5px 10px;
                font-weight: 900;
                border-radius: 5px 0 0 5px;
            }
            value {
                position: relative;
                background-color: ${options.valueColor};
                padding: 5px 10px;
                border-radius: 0 5px 5px 0;
                left: 2px;
            }
        </style>
        <foreignObject width="100%" height="100%">
            <shield xmlns="http://www.w3.org/1999/xhtml">
                <label>${label}</label>
                <value>${value}</value>
            </shield>
        </foreignObject>
    </svg>`
}
