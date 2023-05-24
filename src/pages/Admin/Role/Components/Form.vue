<script setup lang="ts">
import { useCrudRoleStore } from '@/stores/Admin/useCrudRoleStore';
import { useAuthenticationStore } from '@/stores/useAuthenticationStore';
import { lengthMaxValidator, lengthMinValidator, requiredValidator } from '@validators';
import { VForm } from 'vuetify/components';

const storeRole = useCrudRoleStore()
const { formulario } = storeToRefs(storeRole)

const authentication = useAuthenticationStore()
const errors = ref<Array<string>>([])
const todosCheck = ref<string>()
const formValidation = ref<VForm>()

const changeScreen = async (typeAction: string) => {
  storeRole.typeAction = typeAction
  await formValidation.value?.resetValidation()
  errors.value = []
  if (typeAction != 'back')
    storeRole.keyList++
}

const submitForm = async () => {
  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    formulario.value.company_id = authentication.company.id

    const data = await storeRole.fetchSave(formulario.value)
    if (data.status === 200)
      changeScreen('list')
    if (data.status === 422)
      errors.value = data.error // muestra error del back
  }
}

const changePermision = (id: number) => {
  const cond = formulario.value.permissions.findIndex(ele => ele === id)

  console.log(cond)
  if (cond != -1) {
    todosCheck.value = false
    formulario.value.permissions.splice(cond, 1)
  }
  else {
    formulario.value.permissions.push(id)
  }
}

const clearChecks = () => {
  formulario.value.permissions = []
  for (let index = 0; index < storeRole.arrayMenus.length; index++) {
    for (let j = 0; j < storeRole.arrayMenus[index].permissions.length; j++)
      storeRole.arrayMenus[index].permissions[j].estado = 'Inactivo'
  }
}

const selectAll = () => {
  if (!todosCheck.value) {
    formulario.value.permissions = []
    for (let index = 0; index < storeRole.arrayMenus.length; index++) {
      for (let j = 0; j < storeRole.arrayMenus[index].permissions.length; j++) {
        formulario.value.permissions.push(storeRole.arrayMenus[index].permissions[j].id)
        storeRole.arrayMenus[index].permissions[j].estado = 'Activo'
      }
    }
  }
  else {
    clearChecks()
  }
}

onMounted(async () => {
  clearChecks()
  await storeRole.fetchDataForm()
  if (storeRole.roleData.id) {
    formulario.value.permissions = []
    await storeRole.fetchInfoRole(storeRole.roleData.id)
    for (let index = 0; index < storeRole.arrayMenus.length; index++) {
      for (let j = 0; j < storeRole.arrayMenus[index].permissions.length; j++) {
        for (let z = 0; z < formulario.value.permissions.length; z++) {
          if (formulario.value.permissions.includes(storeRole.arrayMenus[index].permissions[j].id))
            storeRole.arrayMenus[index].permissions[j].estado = 'Activo'
        }
      }
    }
  }
})
</script>

<template>
  <div>
    <VRow>
      <VCol
        cols="12"
        class="d-flex justify-content-end"
      >
        <VBtn
          color="secondary"
          @click="changeScreen('back')"
        >
          Atras
        </VBtn>
      </VCol>
    </VRow>

    <VForm
      ref="formValidation"
      lazy-validation
    >
      <VRow>
        <VCol cols="4">
          <VTextField
            v-model="formulario.name"
            maxlength="20"
            :rules="[requiredValidator, lengthMaxValidator(formulario.name, 20), lengthMinValidator(formulario.name, 8)]"
            :error-messages="errors.name"
            label="Nombre"
            @keypress="errors.name = ''"
          />
        </VCol>
        <VCol cols="4">
          <VTextField
            v-model="formulario.description"
            :rules="[requiredValidator, lengthMaxValidator(formulario.description, 50)]"
            maxlength="50"
            :error-messages="errors.description"
            label="Descripción"
            @keypress="errors.description = ''"
          />
        </VCol>
      </VRow>

      <VRow>
        <VCol>
          <span>Todos
            <VCheckbox
              v-model="todosCheck"
              label="Todos"
              @click="selectAll"
            />
          </span>
        </VCol>
      </VRow>

      <VRow>
        <div
          v-for="(item, index) in storeRole.arrayMenus"
          :key="index"
        >
          <VCol cols="3">
            <VCard width="215">
              <VCardItem>
                <VCardTitle>{{ item.title }}</VCardTitle>

                <VCardSubtitle
                  v-for="(perm, i) in item.permissions"
                  :key="i"
                >
                  <VCheckbox
                    v-if="authentication.permissions.includes(perm.name)"
                    :id="`check${index}-${i}`"
                    v-model="perm.estado"
                    :label="perm.name"
                    true-value="Activo"
                    false-value="Inactivo"
                    :value="perm.estado"
                    @click="changePermision(perm.id)"
                  />
                </VCardSubtitle>
              </VCardItem>
            </VCard>
          </VCol>
        </div>
      </VRow>

      <VRow>
        <VCol cols="12 d-flex justify-content-center">
          <VBtn
            color="primary"
            @click="submitForm"
          >
            Guardar
          </VBtn>
        </VCol>
      </VRow>
    </VForm>
  </div>
</template>
