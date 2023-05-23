<template>
  <div class="mt-4 mb-4">
    <VRow>
      <VCol cols="6">
        <VRow>
          <VCol>
            <VCard class="mx-auto" max-width="470">
              <VCardText>
                <p class="text-h5 text--primary">Organización</p>
                <div class="text--primary">
                  <!-- <RouterLink to="">Perfil de la organización</RouterLink><br>  -->
                </div>
              </VCardText>
            </VCard>
            <VCard class="mx-auto mt-4" max-width="470">
              <VCardText>
                <p class="text-h5 text--primary">Catálogos</p>
                <div class="text--primary">
                  <RouterLink :to="{name:'Admin-Tax-Index'}">Impuestos</RouterLink><br  >
                  <RouterLink :to="{name:'Admin-WayToPay-Index'}">Formas de pago</RouterLink><br>
                  <RouterLink :to="{name:'Admin-LedgerAccount-Index'}">Cuenta contable</RouterLink><br>
                  <!-- <RouterLink to="">Gastos/Costos frecuentes</RouterLink> -->
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VCol>
      <VCol cols="6">
        <VRow>
          <VCol>
            <VCard class="mx-auto" max-width="470">
              <VCardText>
                <p class="text-h5 text--primary">Procesos</p>
                <div class="text--primary">
                  <!-- <RouterLink to="">Bloqueo por fecha para transacciones</RouterLink><br>
                  <RouterLink to="">Desbloquear correos para envío de e-mails y notificaciones</RouterLink> -->
                </div>
              </VCardText>
            </VCard>
            <VCard class="mx-auto mt-4" max-width="470">
              <VCardText>
                <p class="text-h5 text--primary">Comprobantes</p>
                <div class="text--primary">
                  <!-- <RouterLink to="">Logo para impresión de comprobantes</RouterLink><br> -->
                  <RouterLink :to="{name:'Admin-TypesReceiptInvoice-Index'}">Facturas</RouterLink><br>
                  <RouterLink :to="{name:'Admin-TypesQuotes-Index'}">Cotizaciones</RouterLink><br>                  
                  <RouterLink :to="{name:'Admin-TypesCreditNote-Index'}">Notas Crédito</RouterLink><br>
                  <!-- <RouterLink to="">Cotizaciones</RouterLink><br>
                  <RouterLink to="">Remisión</RouterLink><br>
                  <RouterLink to="">Compras / Gastos</RouterLink><br>
                  <RouterLink to="">Documento soporte</RouterLink><br>
                  <RouterLink to="">Órdenes de compra</RouterLink><br>
                  <RouterLink to="">Nota dédito / Nota de ajuste documento soporte</RouterLink><br>
                  <RouterLink to="">Nota dédito (Ventas)</RouterLink><br>
                  <RouterLink to="">Recibos de caja</RouterLink><br>
                  <RouterLink to="">Comprobante Recibo de pago</RouterLink><br>
                  <RouterLink to="">Notas de ensamble</RouterLink><br>
                  <RouterLink to="">Comprobantes contables</RouterLink> -->
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </div>
</template>
