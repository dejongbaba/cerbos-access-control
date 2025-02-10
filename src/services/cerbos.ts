import axios from 'axios';

const checkAccess = async (user, resource, action) => {
    console.log('called this')
    const currentTime = new Date().toISOString(); // Send ISO timestamp (UTC)
    try {
        const response = await axios.post('http://localhost:3592/api/check/resources', {
            principal: {
                id: user.id,
                roles: user.roles,
                requestTime: currentTime, // Include user's current time
            },
            resources:[
                {actions: [action],
                    resource: { kind: resource.kind, id: resource.id}}
            ],
        });

        console.log(
            'res',response
        )
        return response?.data?.results?.[0]?.actions[action] === 'EFFECT_ALLOW';
    }catch (e) {
        console.error(e);
    }

};
export {checkAccess};
