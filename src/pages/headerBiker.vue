<script setup lang="ts">
const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>
<template>
  <div>
    <VRow>
      <VCol>
        <VCard>
          <VCardText class="d-flex justify-content-center aling-items-center">
            <VImg contain width="150" height="150"
              src="http://127.0.0.1:8000/storage/users/user_1/company/company_2/logo//LAXVsnMbU53vTHTKCFvBB7zT6pE5sbgSYw7aSGb3.png"
              alt="alt" />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
