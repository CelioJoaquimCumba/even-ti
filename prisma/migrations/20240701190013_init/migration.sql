-- CreateTable
CREATE TABLE "CommunityPartner" (
    "id" TEXT NOT NULL,
    "communityId" TEXT NOT NULL,
    "partnerId" TEXT NOT NULL,

    CONSTRAINT "CommunityPartner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommunityPartner" ADD CONSTRAINT "CommunityPartner_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityPartner" ADD CONSTRAINT "CommunityPartner_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
