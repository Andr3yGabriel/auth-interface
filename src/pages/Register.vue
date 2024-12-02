<script lang="ts">
import axios, { AxiosError } from 'axios';
import { Button, IftaLabel, InputText, Password, Toast } from 'primevue';
import { useToast } from "primevue/usetoast";
import { defineComponent, ref, onMounted, computed } from 'vue';
import apiClient from '../axiosConfig';

export default defineComponent({
    name: 'Register',
    components: {
        InputText,
        Password,
        Button,
        IftaLabel,
        Toast
    },
    setup() {
        const darkMode = ref(false);
        const toast = useToast();
        const username = ref('');
        const email = ref('');
        const password = ref('');
        const errorMessage = ref('');

        onMounted(() => {
            const storedDarkMode = localStorage.getItem('darkMode');
            if (storedDarkMode) {
                darkMode.value = storedDarkMode === 'true';
                document.body.classList.toggle('dark', darkMode.value);
            }
        });

        const toggleDarkMode = () => {
            darkMode.value = !darkMode.value;
            document.body.classList.toggle('dark', darkMode.value);
            localStorage.setItem('darkMode', darkMode.value.toString());
        };

        const register = async () => {
            try {
                const response = await apiClient.post('/auth/register', {
                    username: username.value,
                    email: email.value,
                    password: password.value
                });
                localStorage.setItem('token', response.data.token);
                toast.add({ severity: 'success', summary: 'Success', detail: 'User registered successfully, please check your email!' });
            } catch (error) {
                console.error('Error at user register!', error);
                if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError;
                    if (axiosError.response?.status === 409) {
                        errorMessage.value = 'User with this e-mail already exists!';
                    } else {
                        errorMessage.value = 'Error at user register!';
                    }
                } else {
                    errorMessage.value = 'Error at user register!';
                }
                toast.add({ severity: 'error', summary: 'Error', detail: errorMessage.value });
            }
        };

        const h1Color = computed(() => (darkMode.value ? '#F2F5F7' : '#2C2C2C'));

        return {
            darkMode,
            toggleDarkMode,
            username,
            email,
            password,
            errorMessage,
            register,
            h1Color
        };
    }
});
</script>

<template>
    <div :class="['register-container', darkMode ? 'dark' : 'light']">
        <Toast position="top-left" />
        <nav class="buttons">
            <Button
                :icon="darkMode ? 'pi pi-moon' : 'pi pi-sun'"
                @click="toggleDarkMode"
                :class="darkMode ? 'dark-button' : 'light-button'"
                rounded
            />
        </nav>
        <div class="register">
            <h1 :style="{ color: h1Color }">Register</h1>
            <div class="inputs">
                <div class="p-field">
                    <IftaLabel>
                        <InputText v-tooltip="'Enter your username'" id="username" v-model="username" type="text" />
                        <label for="username">Username</label>
                    </IftaLabel>
                </div>
                <div class="p-field">
                    <IftaLabel>
                        <InputText v-tooltip="'Enter your email'" id="email" v-model="email" type="email" />
                        <label for="email">Email</label>
                    </IftaLabel>
                </div>
                <div class="p-field">
                    <IftaLabel>
                        <Password v-tooltip="'Enter your password'" id="password" v-model="password" toggleMask />
                        <label for="password">Password</label>
                    </IftaLabel>
                </div>
            </div>
            <div class="reg-btn">
                <Button label="Register" @click="register" id="reg-btn" :class="darkMode ? 'dark-button' : 'light-button'"/>
            </div>
        </div>
        <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.register-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    padding-top: 0;
    background-color: inherit;
    color: inherit;

    .register {
        display: flex;
        width: 400px;
        height: 60vh;
        text-align: center;
        background-color: inherit;
        color: inherit;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid #F2F5F7;
        border-radius: 16px;
        box-shadow: 1px 1px 5px gray;

        transition: box-shadow 0.3s ease;

        &:hover {
            box-shadow: 5px 5px 15px gray; 
        }

        h1 {
            font-weight: 500;
        }

        .inputs {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;

            .p-field {
                margin-bottom: 10px;

                .p-iftalabel {
                   div, input {
                        width: 210px;

                        #password {
                            width: 210px;
                        }
                    }
                }

                label {
                    margin-right: 20px;
                    font-weight: 450;
        
                    color: #000;
                }
            }
        }
    }

    .buttons {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        margin-top: 16px;

        Button {
            margin: 0px 10px;
        }
    }
    
    .dark-button {
        background-color: #A626A6;
        color: #FFFFFF;
        border: 0px transparent;

        &:hover {
            background-color: #760276;
            border: 0px transparent;
        }
    }

    .light-button {
        background-color: #00BFFF;
        color: #FFFFFF;
        border: 0px transparent;

        &:hover {
            background-color: #006485;
            border: 0px transparent;
        }
    }

    .error-message {
        margin-top: 8px;
    }

    .light {
        background-color: #F2F5F7;
        color: #2C2C2C;
    }

    .dark {
        background-color: #2C2C2C;
        color: #F2F5F7;
    }
}
</style>

<style lang="scss">
body.dark {
    background-color: #3E3E3E;
    color: #EDEDED;
}

body:not(.dark) {
    background-color: #CDCDCD;
    color: #3E3E3E;
}

.p-password input {
    width: 210px !important;
}
</style>